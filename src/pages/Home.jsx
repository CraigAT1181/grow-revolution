import { useAuth } from "../contexts/AuthContext";
import Authentication from "./Authentication";

export default function Home() {
  const { user } = useAuth();

  if (!user) return <Authentication />;

  return (
    <div>
      <p>Home working!</p>
    </div>
  );
}
