"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { Suspense } from "react";

type Doctor = {
  id: number;
  name: string;
  expertise: string;
  city: string;
};

type FormData = {
  name: string;
  phone: string;
  age: string;
  city: string;
  occupation: string;
  company: string;
  chiefComplaints: string;
  previousExperience: string;
  selectedDoctor: number | null | string;
};

export default function ConsultationBookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    age: "",
    city: "",
    occupation: "",
    company: "",
    chiefComplaints: "",
    previousExperience: "",
    selectedDoctor: null,
  });
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const searchParams = useSearchParams();

  // Get unique cities from doctors
  const uniqueCities = Array.from(
    new Set(doctors.map((doctor) => doctor.city))
  );

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Update city based on URL param after doctors are fetched
  useEffect(() => {
    const cityParam = searchParams.get("city");
    if (cityParam && uniqueCities.includes(cityParam)) {
      setFormData((prev) => ({ ...prev, city: cityParam }));
    }
  }, [searchParams, uniqueCities]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<FormData> = {};

    switch (currentStep) {
      case 1:
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        break;
      case 2:
        if (!formData.age) newErrors.age = "Age is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.occupation)
          newErrors.occupation = "Occupation is required";
        if (
          !["housewife", "homemaker"].includes(
            formData.occupation.toLowerCase()
          ) &&
          !formData.company
        ) {
          newErrors.company = "Company is required";
        }
        break;
      case 3:
        if (!formData.chiefComplaints)
          newErrors.chiefComplaints = "Chief complaints are required";
        break;
      case 4:
        if (parseInt(formData.age) >= 30 && !formData.previousExperience) {
          newErrors.previousExperience =
            "Previous experience is required for age 30 and above";
        }
        break;
      case 5:
        if (!formData.selectedDoctor)
          newErrors.selectedDoctor = "Please select a doctor";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      try {
        const selectedDoctor = doctors.find(
          (doctor) => doctor.id === formData.selectedDoctor
        );

        const patientData = {
          ...formData,
          selectedDoctor: selectedDoctor ? selectedDoctor.name : null,
        };

        const response = await fetch("/api/patients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }

        const result = await response.json();
        console.log("Form submitted successfully:", result);
        // Show success toast
        toast.success("Form submitted successfully!");

        // Reset the form data and step
        setFormData({
          name: "",
          phone: "",
          age: "",
          city: "",
          occupation: "",
          company: "",
          chiefComplaints: "",
          previousExperience: "",
          selectedDoctor: null,
        });

        setStep(1);
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form. Please try again.");
      }
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.city.toLowerCase() === formData.city.toLowerCase()
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                disabled={step === 1}
                type="button"
                onClick={handlePrevious}
              >
                Previous
              </Button>
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                )}
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Select
                  name="city"
                  value={formData.city}
                  onValueChange={(value) => handleSelectChange("city", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  type="text"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  required
                />
                {errors.occupation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.occupation}
                  </p>
                )}
              </div>
              {!["housewife", "homemaker"].includes(
                formData.occupation.toLowerCase()
              ) && (
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <Button type="button" onClick={handlePrevious}>
                Previous
              </Button>
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <Label htmlFor="chiefComplaints">Chief Complaints</Label>
              <Textarea
                id="chiefComplaints"
                name="chiefComplaints"
                value={formData.chiefComplaints}
                onChange={handleInputChange}
                required
              />
              {errors.chiefComplaints && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.chiefComplaints}
                </p>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <Button type="button" onClick={handlePrevious}>
                Previous
              </Button>
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </>
        );
      case 4:
        return (
          <>
            {parseInt(formData.age) >= 30 ? (
              <div>
                <Label htmlFor="previousExperience">
                  Any previous experience with physiotherapy?
                </Label>
                <Textarea
                  id="previousExperience"
                  name="previousExperience"
                  value={formData.previousExperience}
                  onChange={handleInputChange}
                />
                {errors.previousExperience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.previousExperience}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <p className="text-red-500 text-sm mt-1">Confirm Booking</p>
              </div>
            )}
            <div className="flex justify-between mt-4">
              <Button type="button" onClick={handlePrevious}>
                Previous
              </Button>
              <Button type="button" onClick={handleNext}>
                Confirm Booking
              </Button>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Available Doctors in {formData.city}
              </h3>
              {filteredDoctors.length > 0 ? (
                <RadioGroup
                  name="selectedDoctor"
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      selectedDoctor: parseInt(value),
                    }));
                    setErrors((prev) => ({ ...prev, selectedDoctor: "" }));
                  }}
                >
                  {filteredDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <RadioGroupItem
                        value={doctor.id.toString()}
                        id={`doctor-${doctor.id}`}
                      />
                      <Label htmlFor={`doctor-${doctor.id}`}>
                        {doctor.name} - {doctor.expertise}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <p>
                  No doctors available in your city. Please try a different
                  city.
                </p>
              )}
              {errors.selectedDoctor && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.selectedDoctor}
                </p>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <Button type="button" onClick={handlePrevious}>
                Previous
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!formData.selectedDoctor}
              >
                Submit
              </Button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mb-12">
      <CardHeader>
        <CardTitle>Consultation Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>{renderStep()}</form>
      </CardContent>
    </Card>
  );
}

export function ConsultationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConsultationBookingForm />
    </Suspense>
  );
}
