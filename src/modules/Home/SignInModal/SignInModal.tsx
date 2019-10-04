import React, { useCallback, useState } from 'react';
import {
  Button,
  Form,
  Header,
  Icon,
  Image,
  Input,
  Modal,
  Radio,
} from 'semantic-ui-react';

interface Props {
  open: boolean;
  onClose: () => void;
}
type Gender = 'male' | 'female';

const SignInModal = React.memo(({ onClose, open }: Props) => {
  const [gender, setGender] = useState<Gender>('male');
  const [nickName, setNickName] = useState('');
  const changeNickName = useCallback((_, { value }) => setNickName(value), []);
  const changeGender = useCallback((_, { value }) => setGender(value), []);
  return (
    <Modal dimmer size="small" open={open} onClose={onClose}>
      <Modal.Content image>
        <Image
          circular
          size="medium"
          src={process.env.PUBLIC_URL + `/${gender}.png`}
        />
        <Modal.Description>
          <Header>Profile</Header>
          <Form>
            <Form.Field>
              <Input
                focus
                placeholder="Your Nickname..."
                icon={<Icon name="user" color="blue" />}
                value={nickName}
                onChange={changeNickName}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="male"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={changeGender}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="female"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={changeGender}
              />
            </Form.Field>
            <Button disabled={!nickName} type="submit" color="teal">
              Apply
            </Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
});

export default SignInModal;
