'use client';

import type { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react';

import { DndProvider } from "react-dnd"
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const SessionProvider = ({
  session,
  children
}: {
  session: Session | null
  children: React.ReactNode
}) => {
  return (
    <Provider session={session}>
      <DndProvider backend={HTML5Backend}>
        {children}
      </DndProvider>
    </Provider>
  );
}
