// AddVenueModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addvenue } from '@/apis/services/organiser_apis/venue_api';
import { useEventForm } from '@/context/EventFormContext';

interface AddVenueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (venue: {name: string, address: string, city: string}) => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Venue name is required'),
  address: yup.string().required("Venue's address is required"),
  city: yup.string().required("Venue's city is required")
});

export default function AddVenueModal({ open, onOpenChange, onCreate }: AddVenueModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

    const {fetchVenues} = useEventForm()

  const handleCreate = async (data: {
    name: string;
    address: string;
    city: string;
  }) => {
    const dataApi = await addvenue(data);
    onCreate(dataApi);
    reset();
    fetchVenues();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white"
      onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Add New Venue</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreate)} className="space-y-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="venue-name">Venue Name</Label>
            <Input id="venue-name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register('address')} />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register('city')} />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          <Button type="submit" variant={'default'}>
            Add Venue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}