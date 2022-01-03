async function createRoom() {
  // we'll add 30 min expiry (exp) so rooms won't linger too long on your account
  // we'll also turn on chat (enable_chat)
  // see other available options at https://docs.daily.co/reference#create-room
  const exp = Math.round(Date.now() / 1000) + 60 * 30;
  const options = {
    properties: {
      exp,
      enable_chat: true,
    },
  };

  // This endpoint is using the proxy as outlined in netlify.toml
  // Comment this out if you want to use the local option below.
  const response = await fetch(`${window.location.origin}/api/rooms`, {
    method: "POST",
    body: JSON.stringify(options),
  });

  // TODO: Uncomment the request below to test the "create room" functionality locally. Don't forget to comment out the request above, too!

  //   const response = await fetch("https://api.daily.co/v1/rooms/", {
  //     method: "POST",
  //     body: JSON.stringify(options),

  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + process.env.SVELTE_APP_DAILY_API_KEY,
  //     },
  //   });

  if (!response.ok) {
    return {
      error: {
        status: response.status,
      },
    };
  }

  const room = await response.json();
  return room;
}

export default {
  createRoom,
};
