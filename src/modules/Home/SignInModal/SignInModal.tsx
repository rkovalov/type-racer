import React, { useCallback, useContext, useState } from 'react';
import {
  Button,
  Form,
  Header,
  Icon,
  Image,
  Input,
  Message,
  Modal,
} from 'semantic-ui-react';

import { signin } from '../../../dataProvider';
import StoreContext from '../../../store/context';

interface Props {
  open: boolean;
  onClose: () => void;
  onSigninSuccess: () => void;
}

const SignInModal = React.memo(({ onClose, open, onSigninSuccess }: Props) => {
  const [, setState] = useContext(StoreContext);
  const [inProgress, setInProgress] = useState(false);
  const [nickname, setNickName] = useState('');
  const [hasError, setHasError] = useState(false);
  const [password, setPassword] = useState('');
  const changeNickName = useCallback((_, { value }) => setNickName(value), []);
  const changePassword = useCallback((_, { value }) => setPassword(value), []);
  const login = useCallback(() => {
    setInProgress(true);
    signin({ nickname, password })
      .then(user => {
        setState(prevState => ({ ...prevState, currentUser: user }));
        onSigninSuccess();
      })
      .catch(() => setHasError(true));
  }, [nickname, password, onSigninSuccess, setState]);
  const isValid = nickname && password;
  return (
    <Modal dimmer size="small" open={open} onClose={onClose}>
      <Modal.Content image>
        <Image
          circular
          size="medium"
          src={process.env.PUBLIC_URL + '/male.png'}
        />
        <Modal.Description>
          <Header>Sign in</Header>
          <Form onSubmit={login}>
            <Form.Field>
              <Input
                error={hasError}
                placeholder="Nickname..."
                icon={<Icon name="user" color="blue" />}
                value={nickname}
                onChange={changeNickName}
              />
            </Form.Field>
            <Form.Field>
              <Input
                error={hasError}
                type="password"
                placeholder="Password..."
                icon={<Icon name="key" color="blue" />}
                value={password}
                onChange={changePassword}
              />
            </Form.Field>
            <Button
              fluid
              type="submit"
              color="teal"
              disabled={inProgress || !isValid}
              loading={inProgress}
            >
              Sign in
            </Button>
            {hasError && (
              <Message negative>
                <p>Try another nickname or password</p>
              </Message>
            )}
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
});

SignInModal.displayName = 'SignInModal';
export default SignInModal;
