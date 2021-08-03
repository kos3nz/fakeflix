import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Banner from 'components/banner';
import Button from 'components/button';

const Header = () => (
  <Banner>
    <div
      className="
        relative z-10
        pb-[10vh] px-[4vw]
        flex flex-col items-center
      "
    >
      <h1
        className="
        text-paragraph text-4xl xs:text-5xl sm:text-6xl font-bold
        "
      >
        Money Heist
      </h1>
      <div
        className="
          flex items-center gap-3
          mt-6
        "
      >
        <Button as="a" Icon={BsFillPlayFill}>
          Play
        </Button>
        <Button color="gray" Icon={AiOutlineInfoCircle}>
          More info
        </Button>
      </div>
      <p
        className="
          md:max-w-[60vw] mt-4
          text-sm sm:text-base text-paragraph text-center tracking-wide
        "
      >
        To carry out the biggest heist in history, a mysterious man called The
        Professor recruits a band of eight robbers who have a single
        characteristic n...
      </p>
    </div>
  </Banner>
);

export default Header;
