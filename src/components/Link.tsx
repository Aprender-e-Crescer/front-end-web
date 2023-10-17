interface Props {
  text: string;
  to: string;
}

export function Link({ text, to }: Props) {
  return <div>{text}</div>;
}
