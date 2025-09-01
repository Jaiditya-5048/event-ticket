// --- components/EventReviewForm.tsx ---
import { useEventForm } from '@/context/EventFormContext';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

const EventReviewForm = () => {
  const { formData } = useEventForm();

  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle>Review & Submit</CardTitle>
        <CardDescription>
          Make sure all event details are correct
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Event Name:</h3>
          <p>{formData.name}</p>
        </div>
        <div>
          <h3 className="font-semibold">Description:</h3>
          <p>{formData.description}</p>
        </div>
        <div>
          <h3 className="font-semibold">Category:</h3>
          <p>{formData.category}</p>
        </div>

        <div>
          <h3 className="font-semibold">Instances:</h3>
          {formData.instances.map((inst, idx) => (
            <div key={idx} className="border p-2 rounded mb-2">
              <p>
                <strong>Date:</strong> {inst.date}, <strong>Time:</strong>{' '}
                {inst.time}
              </p>
              <p>
                <strong>Venue:</strong> {inst.venue}
              </p>
              <p>
                <strong>Artists:</strong> {inst.artists.join(', ')}
              </p>
              <p>
                <strong>Tickets:</strong>
              </p>
              <ul className="ml-4 list-disc">
                {inst.ticketTypes.map((ticket, i) => (
                  <li key={i}>
                    {ticket.name} - ₹{ticket.price} × {ticket.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventReviewForm;
