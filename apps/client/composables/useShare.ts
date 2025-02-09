import type { SocialLink, Valentine } from '~/types';

export const useShare = (valentine: Valentine) => {
  const { websiteBaseUrl } = useRuntimeConfig().public;

  const link = `${websiteBaseUrl}/${valentine.id}`;

  const text = generateText(valentine.from, valentine.to);

  const socialLinks: SocialLink[] = [
    {
      icon: 'simple-icons:facebook',
      link: `https://www.facebook.com/sharer/sharer.php?u=${link}`,
    },
    {
      icon: 'simple-icons:x',
      link: `https://twitter.com/intent/tweet?url=${link}&text=${text}`,
    },
    {
      icon: 'simple-icons:threads',
      link: `https://www.threads.net/intent/post?text=${text}&url=${link}`,
    },
    {
      icon: 'simple-icons:telegram',
      link: `https://t.me/share/url?url=${link}&text=${text}`,
    },
    {
      icon: 'simple-icons:linkedin',
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
    },
  ];

  const { copy, copied } = useClipboard({ legacy: true });

  return { link, socialLinks, copy, copied };
};
