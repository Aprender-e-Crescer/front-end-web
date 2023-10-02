import { Carousel } from 'flowbite-react';
export type Comment = {
  comment: string;
  name: string;
  photo: string;
};

export type CommentProps = {
  comments: Comment[];
};

function Comment({ comments }: CommentProps) {
  return (
    <>
      <section className="flex p-20 justify-center mt-12">
        <div className="bg-red-600 h-96 w-20 hidden sm:block"></div>
        <div className="bg-orange-500 h-96 w-20 hidden sm:block"></div>
        <div className="bg-yellow-300 h-96 w-20 hidden sm:block"></div>
        <div className="bg-zinc-100 w-2/3 break-normal">
          <Carousel className="h-96 ">
            {comments.map((comment, index) => (
              <div key={index} className="bg-blue-200 p-4 rounded-lg flex items-center gap-8">
                <img className="w-28 h-28 rounded-full" src={comment.photo} alt="" />
                <h1>{comment.name}</h1>
                <span>{comment.comment}</span>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="bg-yellow-300 h-96 w-20 hidden sm:block"></div>
        <div className="bg-orange-500 h-96 w-20 hidden sm:block"></div>
        <div className="bg-red-600 h-96 w-20 hidden sm:block"></div>
      </section>
    </>
  );
}

export default Comment;
