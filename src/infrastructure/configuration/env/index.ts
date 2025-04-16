import { z } from 'zod';
import 'dotenv/config';

// Interfaz para la configuración de las variables de entorno
export interface IEnviromentVariable {
  port: number;
  tokenSecret: string;
}

// Esquema de validación de las variables de entorno
const envSchema = z.object({
  PORT: z.coerce.number().int().default(3000),
  DATABASE_URL: z.string().nonempty(),
  TOKEN_SECRET: z.string().nonempty(),
});

// Devolvemos el objeto de configuración de las variables de entorno
const { success, data } = envSchema.safeParse(process.env);

if (!success) {
  throw new Error('Invalid environment variables');
}

export const env: IEnviromentVariable = {
  port: data.PORT,
  tokenSecret: data.TOKEN_SECRET,
}