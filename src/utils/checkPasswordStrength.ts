import { validatePassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export async function checkPasswordStrength(password: string): Promise<string> {
  const status = await validatePassword(auth, password);

  if (!status.isValid) {
    const issues: string[] = [];

    if (status.containsLowercaseLetter === false) {
      issues.push('at least one lowercase letter');
    }
    if (status.containsUppercaseLetter === false) {
      issues.push('at least one uppercase letter');
    }
    if (status.containsNumericCharacter === false) {
      issues.push('at least one numeric character');
    }
    if (status.containsNonAlphanumericCharacter === false) {
      issues.push('at least one special character');
    }
    if (status.meetsMinPasswordLength === false) {
      issues.push('at least 8 characters');
    }
    if (status.meetsMaxPasswordLength === false) {
      issues.push('at maximum 4096 characters');
    }

    // Return feedback if any of the criteria are not met
    if (issues.length > 0) {
      return `Weak: Password should contain ${issues.join(', ')}.`;
    }
  }

  return 'Valid';
}
