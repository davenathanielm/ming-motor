'use client';

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}



// "use client";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useState, ReactNode} from "react";

// interface ProvidersProps {
// children: ReactNode;  
// }

// export default function Providers({ children } : ProvidersProps) {
//     const [queryClient] = useState(() => new QueryClient());

//     return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
// }