// components/EditOptionsMenu.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import AddArtistModal from '@/components/modals/AddArtistModal';
import AddVenueModal from '@/components/modals/AddVenueModal';
// import EditDateTimeModal from '@/components/modals/EditDateTimeModal';

export default function EditOptionsMenu() {
  const [isArtistOpen, setIsArtistOpen] = useState(false);
  const [isVenueOpen, setIsVenueOpen] = useState(false);
  const [isDateTimeOpen, setIsDateTimeOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => e.stopPropagation()} // stops parent collapsible
          >
            <Edit className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className='bg-white'>
          <DropdownMenuItem
            className="focus:outline-none hover:bg-gray-200 px-3 py-2 cursor-pointer border-none"
            onClick={(e) => {
              e.stopPropagation();
              setIsDateTimeOpen(true);
            }}
          >
            Date & Time
          </DropdownMenuItem>

          <DropdownMenuItem
            className="focus:outline-none hover:bg-gray-200 px-3 py-2 cursor-pointer border-none"
            onClick={(e) => {
              e.stopPropagation();
              setIsVenueOpen(true);
            }}
          >
            Venue
          </DropdownMenuItem>

          <DropdownMenuItem
            className="focus:outline-none hover:bg-gray-200 px-3 py-2 cursor-pointer border-none"
            onClick={(e) => {
              e.stopPropagation();
              setIsArtistOpen(true);
            }}
          >
            Artist
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modals */}
      {/* <EditDateTimeModal
        open={isDateTimeOpen}
        onOpenChange={setIsDateTimeOpen}
      /> */}
      <AddVenueModal
        open={isVenueOpen}
        onOpenChange={setIsVenueOpen}
        onCreate={(venue) => console.log('Venue created:', venue)}
      />
      <AddArtistModal
        open={isArtistOpen}
        onOpenChange={setIsArtistOpen}
        onCreate={(artist) => console.log('Artist created:', artist)}
      />
    </>
  );
}
