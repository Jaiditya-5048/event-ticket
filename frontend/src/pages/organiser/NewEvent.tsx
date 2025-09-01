// --- app/create-event/page.tsx ---
'use client';

import { useState } from 'react';
import EventDetailsForm from '@/components/EventDetailsForm';
import EventInstanceForm from '@/components/EventInstanceForm';
import EventReviewForm from '@/components/EventReviewForm';
import { useEventForm } from '@/context/EventFormContext';
import { Button } from '@/components/ui/button';

const CreateEventPage = () => {
  const [step, setStep] = useState(0);
  const { validateForm, resetForm } = useEventForm();

  const handleNext = async () => {
    // if (step === 2) return;
    // if (step === 1 || step === 2) {
    //   const { isValid } = await validateForm();
    //   if (!isValid) return;
    // }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const { isValid } = await validateForm();
    if (isValid) {
      // Here you could send to backend
      alert('Event successfully created!');
      resetForm();
      setStep(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      {step === 0 && <EventDetailsForm />}
      {step === 1 && <EventInstanceForm />}
      {step === 2 && <EventReviewForm />}

      <div className="flex justify-between pt-6">
        <Button variant="ghost" onClick={handleBack} disabled={step === 0}>
          Back
        </Button>
        {step < 2 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
};

export default CreateEventPage;
