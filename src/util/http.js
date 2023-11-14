import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function fetchEvents({ signal, searchTerm }) {
  console.log('Search Term:', searchTerm);

  let url = 'https://3000-arronbeale-reacttanstac-ce623wqpb30.ws-eu105.gitpod.io/events';

  if (searchTerm) {
    url += '?search=' + searchTerm;
  }

  console.log('Fetch URL:', url);

  try {
    const response = await fetch(url, { signal: signal });

    if (!response.ok) {
      const error = new Error('An error occurred while fetching the events');
      error.code = response.status;
      error.info = await response.json();
      throw error;
    }

    const { events } = await response.json();

    return events;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}


export async function createNewEvent(eventData) {
  const response = await fetch('https://3000-arronbeale-reacttanstac-ce623wqpb30.ws-eu105.gitpod.io/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch(`https://3000-arronbeale-reacttanstac-ce623wqpb30.ws-eu105.gitpod.io/events/images`, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the images');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}

export async function fetchEvent({ id, signal }) {
  const response = await fetch(`https://3000-arronbeale-reacttanstac-ce623wqpb30.ws-eu105.gitpod.io/events/${id}`, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}


export async function deleteEvent({ id }) {
  const response = await fetch(`https://5173-arronbeale-reacttanstac-ce623wqpb30.ws-eu105.gitpod.io/events${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = new Error('An error occurred while deleting the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}