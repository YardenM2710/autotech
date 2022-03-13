import { useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';
import homeAnimation from '../lotties/home-animation';
export function Home() {
  const history = useHistory();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: homeAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <div className="home-page">
        <div className="home-page-details">
          <h1>Welcome </h1>
          <p>Hope youll enjoy this project</p>

          <div>
            <Lottie options={defaultOptions} height={300} width={300} />
          </div>
          <button
            onClick={() => history.push('/contact')}
            className="nice-button"
          >
            Go to contacts
          </button>
        </div>
      </div>
    </>
  );
}
