// InstanceModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import EventInstanceForm from '../eventForms/EventInstanceForm';

interface InstanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'add' | 'edit';
  defaultValues?: {
    id?: number;
    date?: string;
    time?: string;
    venue_id?: string;
    // Add more optional fields as needed
  };
}

const schema = yup.object().shape({
  date: yup.string().required('Date is required'),
  time: yup.string().required('Time is required'),
  venue_id: yup.string().required('Venue is required'),
});

export default function InstanceModal({
  open,
  onOpenChange,
  mode,
  defaultValues = {},
}: InstanceModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: defaultValues.date || '',
      time: defaultValues.time || '',
      venue_id: defaultValues.venue_id || '',
    },
  });

  const handleFormSubmit = async (data: any) => {
    if (mode === 'add') {
      // TODO: Call API to add new event instance
      console.log('Adding instance:', data);
    } else {
      // TODO: Call API to update existing event instance
      console.log('Updating instance:', { id: defaultValues.id, ...data });
    }

    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add New Instance' : 'Edit Instance'}
          </DialogTitle>
        </DialogHeader>
        <EventInstanceForm />
      </DialogContent>
    </Dialog>
  );
}
