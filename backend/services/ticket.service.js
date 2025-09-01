export const getEventTicketsServiceOrganiser = async (
  event_id,
  organiser_id
) => {
  const event = await findEventIfOwnedByUser(event_id, organiser_id);
  if (!event) return null;

  return findEventTicketsWithUser(event_id);
};
