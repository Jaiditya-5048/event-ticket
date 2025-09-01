import * as Dialog from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faTimes,
  faMapMarkerAlt,
  faUser,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import { mainSearch } from '../../apis/services/search_api';
import SearchIconCard from '../SearchIconCard';
import { EventInstance } from '../../utils/types/event_types';
import { useUserLocation } from '../../context/UserLocationContext';
import { fetchInstancesByLocation } from '../../apis/services/instance_api';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const categoryIcons: Record<string, IconDefinition> = {
  all: faCalendarAlt,
  event: faCalendarAlt,
  venue: faMapMarkerAlt,
  artist: faUser,
};

type SearchModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function SearchModal({ isOpen, closeModal }: SearchModalProps) {
  const { userLocation } = useUserLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<EventInstance[]>([]);
  const [category, setCategory] = useState<'event' | 'venue' | 'artist' | 'all'>(
    'all'
  );
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchInstancesByLocation(userLocation || '')
        .then((data) => {
          setSearchResults(data.slice(0, 10));
          setNoResults(data.length === 0);
        })
        .catch((err) => {
          console.error('Initial fetch failed', err);
          setSearchResults([]);
          setNoResults(true);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (isOpen && searchTerm.trim()) {
        mainSearch(searchTerm.trim(), category)
          .then((results) => {
            setSearchResults(results);
            setNoResults(results.length === 0);
          })
          .catch((err) => {
            console.error('Search failed', err);
            setSearchResults([]);
            setNoResults(true);
          });
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, category, isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />

        {/* Modal Content */}
        <Dialog.Content
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          onInteractOutside={closeModal}
        >
          <div className="w-full h-full max-w-xl max-h-[65%] bg-white rounded-xl p-6 shadow-xl overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg font-medium text-gray-900">
                Search
              </Dialog.Title>
              <Dialog.Close asChild>
                <button onClick={closeModal}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-gray-600 size-10 cursor-pointer"
                  />
                </button>
              </Dialog.Close>
            </div>

            {/* Search Controls */}
            <div className="flex items-center gap-2 mb-4">
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value as 'event' | 'venue' | 'artist' | 'all'
                    )
                  }
                  className="h-10 pl-8 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All</option>
                  <option value="event">Event</option>
                  <option value="venue">Venue</option>
                  <option value="artist">Artist</option>
                </select>
                <FontAwesomeIcon
                  icon={categoryIcons[category] || faCalendarAlt}
                  className="absolute left-2 top-2.5 text-gray-400 pointer-events-none"
                />
              </div>

              {/* Search Input */}
              <div className="relative w-full">
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-2.5 text-gray-400"
                />
              </div>
            </div>

            {/* Results */}
            {noResults ? (
              <div className="text-center text-gray-500 mt-8">
                No results found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {searchResults.map((item: EventInstance) => (
                  <SearchIconCard
                    key={item.instance_id}
                    eventInstance={item}
                    img="../../public/components/event_card_pic.jpeg"
                    closeModal={closeModal}
                  />
                ))}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
