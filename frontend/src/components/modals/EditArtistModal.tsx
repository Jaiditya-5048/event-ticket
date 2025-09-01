import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEventForm } from '@/context/EventFormContext';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import AddArtistModal from './AddArtistModal'; // ✅ already exists
import { updateEventInstanceArtists } from '@/api/eventInstances'; // your API

type EditInstanceArtistsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialArtists: { artist_id: string; name: string }[];
  instanceId: string;
  onSave: (artists: { artist_id: string; name: string }[]) => void;
};

export default function EditInstanceArtistsModal({
  open,
  onOpenChange,
  initialArtists,
  instanceId,
  onSave,
}: EditInstanceArtistsModalProps) {
  const { artistsList } = useEventForm(); // ✅ context already has all artists
  const [openAddModal, setOpenAddModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      artistIds: initialArtists.map((a) => a.artist_id),
    },
    validationSchema: Yup.object({
      artistIds: Yup.array()
        .of(Yup.string())
        .min(1, 'Select at least one artist'),
    }),
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // 🔥 Call API
        await updateEventInstanceArtists(instanceId, values.artistIds);
        // const updated = artistsList.filter((a) =>
        //   values.artistIds.includes(a.artist_id)
        // );
        // onSave(updated);
        onOpenChange(false);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const addArtistId = (id: string) => {
    if (!formik.values.artistIds.includes(id)) {
      formik.setFieldValue('artistIds', [...formik.values.artistIds, id]);
    }
  };

  const removeArtistId = (id: string) => {
    formik.setFieldValue(
      'artistIds',
      formik.values.artistIds.filter((x) => x !== id)
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Artists</DialogTitle>
          </DialogHeader>

          {/* Selected Artists Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {formik.values.artistIds.map((id) => {
              const artist = artistsList.find(
                (a) => a.artist_id.toString() === id
              );
              return (
                <Badge
                  key={id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {artist?.name || 'Unknown'}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeArtistId(id)}
                  />
                </Badge>
              );
            })}
          </div>

          {/* Dropdown */}
          <Select onValueChange={addArtistId}>
            <SelectTrigger>Select Artist</SelectTrigger>
            <SelectContent>
              {artistsList.map((artist) => (
                <SelectItem key={artist.artist_id} value={(artist.artist_id).toString()}>
                  {artist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Add New Artist Button */}
          <div className="mt-3">
            <Button variant="outline" onClick={() => setOpenAddModal(true)}>
              + Add New Artist
            </Button>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => formik.handleSubmit()}
              disabled={formik.isSubmitting}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nested Add Artist Modal */}
      {/* <AddArtistModal
        open={openAddModal}
        onOpenChange={setOpenAddModal}
        onCreate={(newArtist) => {
          // context updates automatically, just push ID
          addArtistId(String(newArtist.artist_id));
        }}
      /> */}
    </>
  );
}
