import Link from 'next/link';
import { Button } from './ui/button';

export default function ProfileButton() {
  // TODO: implement
  // User is logged in -> avatar + menu
  // User is not logged in -> login button
  return (
    <Link href='/login'>
      <Button> Login</Button>
    </Link>
  );
}
