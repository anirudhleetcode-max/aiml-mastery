import { appUrl, type EmailMessage } from './send';

/**
 * The two transactional messages.
 *
 * Both are written plainly and say what to do if the recipient did not ask
 * for them, because a verification mail arriving unrequested is the first
 * signal someone has typed the wrong address — or is being targeted.
 *
 * Every interpolated value here is either a token this server generated or a
 * name the server escapes, so the HTML is safe by construction rather than by
 * sanitisation.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function layout(heading: string, body: string, cta: { label: string; href: string }, footer: string): string {
  return `<!doctype html>
<html lang="en"><body style="margin:0;background:#0b0f19;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#111726;border:1px solid #1f2937;border-radius:14px;padding:32px">
        <tr><td>
          <p style="margin:0 0 20px;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#8b95a8">AI/ML Mastery</p>
          <h1 style="margin:0 0 14px;font-size:21px;line-height:1.3;color:#f2f4f8">${escapeHtml(heading)}</h1>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#a1aaba">${body}</p>
          <a href="${cta.href}" style="display:inline-block;background:#6a47f5;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:12px 22px;border-radius:10px">${escapeHtml(cta.label)}</a>
          <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#758095">Or paste this into your browser:<br><span style="color:#a78bfa;word-break:break-all">${cta.href}</span></p>
          <p style="margin:24px 0 0;padding-top:20px;border-top:1px solid #1f2937;font-size:13px;line-height:1.6;color:#758095">${escapeHtml(footer)}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export function verificationEmail(to: string, name: string, token: string): EmailMessage {
  const href = `${appUrl()}/verify-email?token=${encodeURIComponent(token)}`;
  const first = name.trim().split(/\s+/)[0] || 'there';
  return {
    to,
    subject: 'Confirm your email — AI/ML Mastery',
    text: [
      `Hello ${first},`,
      '',
      'Confirm this address to finish setting up your AI/ML Mastery account:',
      href,
      '',
      'The link is good for 24 hours and can be used once.',
      '',
      'If you did not create an account, ignore this — nothing was set up, and',
      'the address will not be used again.',
    ].join('\n'),
    html: layout(
      `Confirm your email, ${escapeHtml(first)}`,
      'One click and your account is ready. The link below is good for 24 hours and works once.',
      { label: 'Confirm my email', href },
      'If you did not create an account, ignore this. Nothing was set up and this address will not be used again.',
    ),
  };
}

export function passwordResetEmail(to: string, name: string, token: string): EmailMessage {
  const href = `${appUrl()}/reset-password?token=${encodeURIComponent(token)}`;
  const first = name.trim().split(/\s+/)[0] || 'there';
  return {
    to,
    subject: 'Reset your password — AI/ML Mastery',
    text: [
      `Hello ${first},`,
      '',
      'Use this link to choose a new password:',
      href,
      '',
      'It expires in one hour and can be used once. Setting a new password',
      'signs out every other device.',
      '',
      'If you did not ask for this, ignore it — your password has not changed,',
      'and the link stops working on its own.',
    ].join('\n'),
    html: layout(
      'Choose a new password',
      'The link below expires in one hour and works once. Setting a new password signs out every other device.',
      { label: 'Set a new password', href },
      'If you did not ask for this, ignore it. Your password has not changed and the link expires on its own.',
    ),
  };
}
