export default function enterHandler(event, chatInput, chatMessagesMaker, geolocation, modal) {
  if (event.key === 'Enter') {
    const { value } = chatInput;
    if (!value || !value.trim()) {
      chatInput.setAttribute('value', '');
      return;
    }

    geolocation.setLocation();

    chatInput.setAttribute('disabled', '');

    const timerId = setInterval(() => {
      if (chatInput.dataset.geoResponse) {
        const geoResponse = JSON.parse(chatInput.dataset.geoResponse);

        if (geoResponse.success) {
          chatMessagesMaker.addMessage(geoResponse);
        } else {
          modal.setContent(geoResponse);
          modal.toggle();
        }

        clearInterval(timerId);
      }
    }, 200);

    chatInput.removeAttribute('disabled');
  }
}
