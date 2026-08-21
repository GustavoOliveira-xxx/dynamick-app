import { z } from 'zod';

/** Mesmas regras no cliente e no servidor (§9). */

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Informe seu e-mail.')
  .email('Esse e-mail não parece válido. Confira se falta o @ ou o domínio.')
  .max(190, 'E-mail longo demais.')
  .transform((value) => value.toLowerCase());

export const passwordSchema = z
  .string()
  .min(8, 'A senha precisa de pelo menos 8 caracteres.')
  .max(200, 'Senha longa demais.');

export const nameSchema = z
  .string()
  .trim()
  .min(2, 'Informe pelo menos 2 caracteres.')
  .max(60, 'Use no máximo 60 caracteres.');

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Informe sua senha.'),
});

export const forgotPasswordSchema = z.object({ email: emailSchema });

export const resetPasswordSchema = z.object({
  token: z.string().min(10, 'Código inválido.'),
  password: passwordSchema,
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
