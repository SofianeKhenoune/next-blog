import { HeaderNavigation } from './header-navigation';
import Logo from './logo';
import PageContainer from './page-container';
import ProfileButton from './profile-button';
import ResponsiveMenu from './responsive-menu';
import ToggleTheme from './toggle-theme';
ProfileButton;

export default function Header() {
  return (
    <header className='p-4 w-full max-w-7xl mx-auto border-b'>
      <PageContainer>
        <div className='flex items-center justify-between w-full '>
          <div className='flex items-center gap-4'>
            <ResponsiveMenu />
            <Logo />
          </div>
          {/* Navigation */}
          <HeaderNavigation />
          <div className='flex items-center gap-4'>
            {/* toggle theme */}
            <ToggleTheme />
            {/* Button */}
            <ProfileButton />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
