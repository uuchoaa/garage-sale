import { Button } from "@/components/catalyst/button";
import { Loader2 } from "lucide-react";
import { Streamdown } from 'streamdown';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <Loader2 className="animate-spin" />
        Example Page
        <Streamdown>Any **markdown** content</Streamdown>
        <Button>Example Button</Button>
      </main>
    </div>
  );
}
