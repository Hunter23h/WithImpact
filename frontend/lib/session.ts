import { User, getServerSession } from "next-auth";
export const session = async ({ session, token }: any) => {
  session.user.id = token.id;
  return session;
};

export const getUserSession = async (): Promise<User> => {
  // Get server session retrieve the session from the server-side
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });
  // if (!authUserSession) throw new Error('unauthorized')

  return authUserSession?.user;
};
