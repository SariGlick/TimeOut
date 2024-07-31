const updateMessageStatus = async (messageId, newStatus) => {
  try {
    const response = await fetch('/messages/updateStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messageId, newStatus }),
    });

    if (!response.ok) {
      throw new Error('Failed to update message status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { updateMessageStatus };