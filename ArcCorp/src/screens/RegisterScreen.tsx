import * as React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Card, Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import type { RootStackParamList } from '../navigation/types';
import { FormTextInput } from '../components/FormTextInput';
import { InlineAlert } from '../components/InlineAlert';
import { register } from '../services/auth';
import { isValidEmail, validatePassword } from '../utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [repeatError, setRepeatError] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  function validate(): boolean {
    let ok = true;
    const e = email.trim();

    if (submitError) setSubmitError(null);

    if (!e) {
      setEmailError('Email zorunludur');
      ok = false;
    } else if (!isValidEmail(e)) {
      setEmailError('Geçerli bir email giriniz');
      ok = false;
    } else {
      setEmailError(null);
    }

    const pErr = validatePassword(password);
    setPasswordError(pErr);
    if (pErr) ok = false;

    if (!passwordRepeat || passwordRepeat.trim().length === 0) {
      setRepeatError('Şifre tekrarı zorunludur');
      ok = false;
    } else if (passwordRepeat !== password) {
      setRepeatError('Şifreler eşleşmiyor');
      ok = false;
    } else {
      setRepeatError(null);
    }

    return ok;
  }

  async function onSubmit() {
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await register({
        email: email.trim(),
        password,
        password_repeat: passwordRepeat,
      });

      // Backend always 200; success is inferred from response body (message/user_id)
      if (res.success) {
        navigation.replace('Home', { message: res.message });
        return;
      }

      setSubmitError(res.message || 'Kayıt başarısız');
    } catch (err: any) {
      setSubmitError(err?.message ?? 'Ağ hatası oluştu');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.bg}>
        <View style={[styles.blob, styles.blob1]} />
        <View style={[styles.blob, styles.blob2]} />
      </View>

      <View style={styles.inner}>
        <View style={styles.brand}>
          <View style={styles.brandIconWrap}>
            <MaterialCommunityIcons name="account-plus" size={26} color="white" />
          </View>
          <View>
            <Text variant="headlineMedium" style={styles.title}>
              Kayıt Ol
            </Text>
            <Text style={styles.subtitle}>Yeni bir hesap oluşturun</Text>
          </View>
        </View>

        <Card mode="elevated" style={styles.card}>
          <Card.Content>
            {submitError ? <InlineAlert text={submitError} type="error" /> : null}

            <FormTextInput
              label="Email"
              value={email}
              onChangeText={t => {
                setEmail(t);
                if (emailError) setEmailError(null);
                if (submitError) setSubmitError(null);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              errorText={emailError}
              disabled={loading}
              style={styles.input}
              testID="register-email"
            />

            <FormTextInput
              label="Password"
              value={password}
              onChangeText={t => {
                setPassword(t);
                if (passwordError) setPasswordError(null);
                if (submitError) setSubmitError(null);
              }}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              errorText={passwordError}
              disabled={loading}
              style={styles.input}
              testID="register-password"
            />

            <FormTextInput
              label="Password Repeat"
              value={passwordRepeat}
              onChangeText={t => {
                setPasswordRepeat(t);
                if (repeatError) setRepeatError(null);
                if (submitError) setSubmitError(null);
              }}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              errorText={repeatError}
              disabled={loading}
              style={styles.input}
              testID="register-password-repeat"
            />

            <Button
              mode="contained"
              onPress={onSubmit}
              loading={loading}
              disabled={loading}
              style={styles.primaryBtn}
              testID="register-submit"
            >
              Kayıt Ol
            </Button>

            <Button
              mode="text"
              onPress={() => navigation.goBack()}
              disabled={loading}
              testID="back-login"
            >
              Zaten hesabın var mı? Giriş Yap
            </Button>
          </Card.Content>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1220' },
  bg: { ...StyleSheet.absoluteFillObject },
  blob: { position: 'absolute', borderRadius: 999 },
  blob1: {
    width: 260,
    height: 260,
    top: -70,
    left: -60,
    backgroundColor: 'rgba(168, 85, 247, 0.28)',
  },
  blob2: {
    width: 320,
    height: 320,
    bottom: -120,
    right: -110,
    backgroundColor: 'rgba(59, 130, 246, 0.22)',
  },
  inner: { flex: 1, padding: 18, justifyContent: 'center' },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 14,
  },
  brandIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: 'white', textAlign: 'left', fontWeight: '900' },
  subtitle: { color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  input: { marginTop: 6 },
  primaryBtn: { marginTop: 6, borderRadius: 12 },
});



