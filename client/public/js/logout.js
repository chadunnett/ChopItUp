import React from 'react';

async function logout() {
  const response = await fetch('/routes/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

function LogoutButton() {
  return (
    <button id="logout" onClick={logout}>
      Logout
    </button>
  );
}