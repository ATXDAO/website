import {
  ButtonGroup,
  ButtonGroupProps,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { ElementType, FC } from 'react';
import {
  FaDiscord,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';

type Social = 'github' | 'linkedin' | 'email' | 'twitter' | 'discord';
const iconMap: Record<Social, ElementType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
  twitter: FaTwitter,
  discord: FaDiscord,
};

interface SocialLinkProps {
  social: Social;
  href: string;
}

export const SocialLinks: FC<
  ButtonGroupProps & { socialLinks: SocialLinkProps[] }
> = ({ socialLinks, fontSize, ...props }) => (
  <ButtonGroup variant="ghost" {...props}>
    {socialLinks.map(({ href, social }) => (
      <IconButton
        as="a"
        key={`button-${social}-${href}`}
        href={href}
        target="_blank"
        aria-label={social}
        icon={<Icon as={iconMap[social]} fontSize={fontSize} />}
      />
    ))}
  </ButtonGroup>
);
