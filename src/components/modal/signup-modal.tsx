import { useState } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { Button } from '@components/ui/button';
import { CustomIcon } from '@components/ui/custom-icon';
import { InputField } from '@components/input/input-field';
import type { ChangeEvent } from 'react';

type SignUpModalProps = {
  closeModal: () => void;
};

export function SignUpModal({ closeModal }: SignUpModalProps): JSX.Element {
  const { signInWithGoogle } = useAuth();
  const [inputValueEmail, setInputValueEmail] = useState('');
  const [inputValuePassword, setInputValuePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    setInputValueEmail(value);

  const handleChangePassword = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const redactedValue = value.replace(/./g, '•');
    setInputValuePassword(redactedValue);
  };

  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex flex-col gap-3 text-center'>
        <h2 className='text-2xl font-bold'>Welcome back, Exonaut!</h2>
        <p className='text-light-secondary dark:text-dark-secondary'>
          Select a sign-in method to continue to Endeavour.
        </p>
      </div>
      <div className='flex w-full flex-col gap-3 px-12'>
        <Button
          className='flex items-center justify-center gap-2 border border-light-line-reply font-bold text-light-primary transition
                      hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0 dark:bg-white
                      dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
          onClick={signInWithGoogle}
        >
          <CustomIcon
            className='h-6 w-6 text-light-primary dark:text-dark-primary'
            iconName='GoogleIcon'
          />
          <span>Sign in with Google</span>
        </Button>
        <Button
          className='flex items-center justify-center gap-2 border border-light-line-reply font-bold text-light-primary transition
                      hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0 dark:bg-white
                      dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
          onClick={signInWithGoogle}
          disabled
        >
          <CustomIcon
            className='h-6 w-6 text-light-primary dark:text-dark-primary'
            iconName='GitHubIcon'
          />
          <span>Sign in with GitHub</span>
        </Button>
        <div className='grid w-full grid-cols-[1fr,auto,1fr] items-center gap-2'>
          <i className='border-b border-light-border dark:border-dark-border' />
          <p>or</p>
          <i className='border-b border-light-border dark:border-dark-border' />
        </div>
        <div className='flex flex-col gap-3'>
          <InputField
            label='Email'
            inputId='email'
            inputValue={inputValueEmail}
            errorMessage={errorMessage}
            handleChange={handleChange}
          />
          <InputField
            label='Password'
            inputId='password'
            inputValue={inputValuePassword}
            errorMessage={errorMessage}
            handleChange={handleChangePassword}
          />
          <Button
            className='flex items-center justify-center gap-2 border border-light-line-reply font-bold text-light-primary transition
                      hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc] dark:border-0 dark:bg-white
                      dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
            onClick={signInWithGoogle}
          >
            <CustomIcon
              className='h-6 w-6 text-light-primary dark:text-dark-primary'
              iconName='EndeavourIcon'
            />
            <span>Sign Up</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
