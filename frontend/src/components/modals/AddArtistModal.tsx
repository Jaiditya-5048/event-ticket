import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addArtist } from '@/apis/services/organiser_apis/artists_api';
import { useEventForm } from '@/context/EventFormContext';

interface AddArtistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (artist: { name: string, bio: string }) => void;
}

const schemaArtist = yup.object().shape({
  name: yup.string().required('Artist name is required'),
  bio: yup
    .string()
    .required('Artist bio is required')
    .min(10, 'Bio must be at least 10 characters long'),
});

export default function AddArtistModal({ open, onOpenChange, onCreate }: AddArtistModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaArtist) });

  const {fetchArtists} = useEventForm()
  const handleCreate = async (data: { name: string; bio: string }) => {
    const dataApi = await addArtist(data)
    onCreate(dataApi);
    reset();
    fetchArtists()
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white"
      onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Add New Artist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreate)} className="space-y-4 ">
          <div className="flex flex-col gap-3">
            <Label htmlFor="artist-name">Artist Name</Label>
            <Input id="artist-name" {...register('name')} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" {...register('bio')}/>
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>
          <Button type="submit">Add Artist</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
