import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LANDING_SECTIONS, SOURCES_SECTION } from '../../core/navigation/landing-sections';
import { I18nStore } from '../../i18n/i18n-store';
import { BrandMark } from '../../shared/brand-mark/brand-mark';
import { Icon } from '../../shared/icon/icon';
import { type IconName } from '../../shared/icon/icon-name';
import { LanguageToggle } from '../language-toggle/language-toggle';

interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: IconName;
}

const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/matsvincenzi', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mateusvincenzi/', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/matts.dev/', icon: 'instagram' },
  { label: 'Discord', href: 'https://discord.gg/NvsmEv4kC5', icon: 'discord' },
];

const UNIVERSITY = {
  name: 'Universidade Católica de Brasília',
  href: 'https://ucb.catolica.edu.br/',
} as const;

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, BrandMark, Icon, LanguageToggle],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  protected readonly t = inject(I18nStore).messages;
  protected readonly sections = LANDING_SECTIONS;
  protected readonly sourcesSection = SOURCES_SECTION;
  protected readonly socialLinks = SOCIAL_LINKS;
  protected readonly university = UNIVERSITY;
  protected readonly year = new Date().getFullYear();
}
