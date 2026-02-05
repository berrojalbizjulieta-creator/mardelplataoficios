import { KeyRound } from 'lucide-react';

export function Logo(props: any) {
  // Combina la clase 'text-primary' con cualquier otra clase que se pase en las props
  // para asegurar que el color del ícono siempre sea azul.
  const combinedClassName = `text-primary ${props.className || ''}`;

  // Extraemos 'className' para no pasarlo dos veces.
  const { className, ...restProps } = props;

  return (
    <div className="flex items-center gap-2">
      <KeyRound className={combinedClassName} {...restProps} />
      <div className="text-xl font-bold font-headline">
        <span className="text-primary">Cerrajeros</span>
        <span className="text-foreground">Argentinos</span>
      </div>
    </div>
  );
}
