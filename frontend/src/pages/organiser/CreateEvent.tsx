import EventForm from '@/components/eventForms/EventForm';
import EventInstanceForm, { EventInstanceFormRef, FormValues } from '@/components/eventForms/EventInstanceForm';
import { Button } from '@/components/ui/button';
import { useEventForm } from '@/context/EventFormContext';
import React, { useRef, useState } from 'react'

function CreateEvent() {
  const { setEvent } = useEventForm();
  const [step, setStep] = useState<number>(1);
  const formRef = useRef<EventInstanceFormRef>(null); // <--- ref to child form

  // 🔹 Your Next button handler
  const handleNextClick = () => {
    formRef.current?.resetFormState();
    setStep(0)
  };

  return (
    <>
      <div className="max-w-3xl mx-auto py-10 space-y-6">
        <div>
          {step === 0 && <p className="text-5xl">Create Event</p>}
          {step === 1 && <p className="text-5xl">Create Instances</p>}
        </div>
        {step === 0 && <EventForm onSuccess={() => setStep(1)} />}
        {step === 1 && (
          <>
            <EventInstanceForm ref={formRef} />

            <div className="flex justify-end mt-4">
              <Button onClick={handleNextClick}>Finish</Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CreateEvent
