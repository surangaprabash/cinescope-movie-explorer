import { isValidYouTubeKey } from "../../utils/helpers";

// Privacy-friendly YouTube embed (youtube-nocookie.com).
// We only render if the key looks like a real YouTube id.
export default function TrailerEmbed({ videoKey, title }) {
  if (!isValidYouTubeKey(videoKey)) return null;

  return (
    <div className="w-full overflow-hidden bg-black shadow-lg aspect-video rounded-xl">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoKey}`}
        title={`${title} trailer`}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="w-full h-full"
      />
    </div>
  );
}