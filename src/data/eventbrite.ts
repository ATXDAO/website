import NO_IMAGE from '../../public/img/no_image.png';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EventBrite {
  export interface IName {
    text: string;
    html: string;
  }

  export interface IImage {
    url: string;
  }

  export interface ILogo {
    original: IImage;
  }
  export interface IDescription {
    text: string;
    html: string;
  }

  export interface ITime {
    timezone: string;
    local: string;
    utc: string;
  }

  export interface IEvent {
    url: string;
    published: string;
    name: IName;
    description: IDescription;
    logo: ILogo;
    shareable: boolean;
    start: ITime;
    end: ITime;
    id: string;
    status: string;
    address: string | undefined;
  }
}

export interface DaoEvent {
  id: string;
  img: string;
  shareable: boolean | null;
  link: string;
  title: string;
  timestamp: Date;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  eventId: string | null;
  status: string;
}

export const extractEventDetails = (obj: EventBrite.IEvent): DaoEvent => ({
  id: obj.id,
  title: obj.name.text,
  timestamp: new Date(obj.end.local),
  date: new Date(obj.start.local).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  startTime: new Date(obj.start.local).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }),
  endTime: new Date(obj.end.local).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }),
  status: obj.status,
  description: obj.description.html,
  link: obj.url,
  img: obj.logo ? obj.logo.original.url : NO_IMAGE.src,
  eventId: obj.id ? obj.id : null,
  shareable: obj.shareable ? obj.shareable : null,
});
