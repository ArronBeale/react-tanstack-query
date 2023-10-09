export async function fetchEvents() {
  const response = await fetch(
    'https://3000-arronbeale-reacttanstac-ce623wqpb30.ws-eu105.gitpod.io/events'
  );

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}
