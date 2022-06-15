const LOCAL_STORAGE_KEY = "user";

interface UserLocalStorage {
  id: string;
}

const storeUserIdInBrowserStorage = (userId: string) => {
  const user: UserLocalStorage = {
    id: userId,
  };
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("Cannot store user in local storage", e);
  }
};

const retrieveUserIdFromBrowserStorage = (): UserLocalStorage | undefined => {
  let userId;

  try {
    const user = localStorage.getItem(LOCAL_STORAGE_KEY);
    userId = user ? JSON.parse(user) : undefined;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("Cannot get user from local storage", e);
  }

  return userId;
};

export const getUserId = (): UserLocalStorage => {
  let userId = retrieveUserIdFromBrowserStorage();

  if (!userId) {
    const newId = `${Math.floor(Math.random() * 1000000)}`;
    storeUserIdInBrowserStorage(newId);
    userId = { id: newId };
  }
  return userId;
};

/**
 * Clears the user from local storage resetting the experience.
 * Doesn't delete the user via API
 */
export const clearUserIdFromBrowserStorage = () => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    location.reload();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("Cannot remove user from local storage", e);
  }
};
