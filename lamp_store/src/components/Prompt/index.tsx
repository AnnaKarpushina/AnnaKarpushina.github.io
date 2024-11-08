import './styles.scss';

import { FC, ReactNode } from 'react';

interface IPrompt {
    children: ReactNode;
}

const Prompt: FC<IPrompt> = ({
    children,
}) => (
    <div className="prompt">
        {children}
    </div>
);

export default Prompt;
