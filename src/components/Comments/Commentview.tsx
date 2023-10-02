import Comment from './Comment';
import componentsjson from '../components.json';

const Commentview = () => {
  const comments = componentsjson[4].comments || [];

  return (
    <div>
      <Comment comments={comments} />
    </div>
  );
};

export default Commentview;
