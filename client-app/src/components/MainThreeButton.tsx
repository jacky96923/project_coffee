import { TagIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { BriefcaseIcon } from "@heroicons/react/24/solid";

export default function MainThreeButton() {
  return (
    <>
      <div className="location">
        <MapPinIcon />
        <h3>location</h3>
      </div>
      <div className="award">
        <TagIcon />
        <h3>kjsdhkfhs</h3>
      </div>
      <div className="histry">
        <BriefcaseIcon />
        <h3>dsfjlldsh</h3>
      </div>
    </>
  );
}
<style>.lcation{}</style>;
