export const generateRandomState = () => {
  return Math.random().toString(36).substring(7);
}

export type GoogleAuthSession = {
  id: string
  state: string
  created_at: number
}

export class GoogleAuthSessionManager {
  private static sessions: GoogleAuthSession[] = []

  public static createSession(id: string, state: string) {
    const session: GoogleAuthSession = {
      id,
      state,
      created_at: Date.now(),
    }

    this.sessions.push(session)

    return session
  }

  public static getSession(id: string) {
    return this.sessions.find(session => session.id === id)
  }

  public static deleteSession(id: string) {
    this.sessions = this.sessions.filter(session => session.id !== id)
  }
}

