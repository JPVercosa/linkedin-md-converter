import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'linkedin-md-converter';
  isDarkTheme = false;
  isSettingsOpen = false;
  header1Replace = '#';
  header2Replace = '⇒';
  header3Replace = '→';

  @ViewChild('convertedText') convertedText!: ElementRef;

  convert() {
    const markdown = (document.querySelector('textarea[placeholder="Enter Markdown here"]') as HTMLTextAreaElement).value;
    const linkedinPost = this.convertMarkdownToLinkedIn(markdown);
    (document.querySelector('textarea[placeholder="Converted LinkedIn Post"]') as HTMLTextAreaElement).value = linkedinPost;
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  openSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  copyContent() {
    const text = this.convertedText.nativeElement.value;
    navigator.clipboard.writeText(text).catch(err => console.error('Copy failed', err));
  }

convertMarkdownToLinkedIn(markdown: string): string {
  let result = markdown
    // Headings
    .replace(/^###\s+(.*)/gm, `${this.header3Replace} $1`)
    .replace(/^##\s+(.*)/gm, `${this.header2Replace} $1`)
    .replace(/^#\s+(.*)/gm, `${this.header1Replace} $1`)
    // Lists
    .replace(/^\s*[-*]\s+/gm, '• ')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, (_, txt) => this.toSansSerifBold(txt))
    // Italic
    .replace(/__(.+?)__/g, (_, txt) => this.toSansSerifItalic(txt))
    // Links → "Description: URL"
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1: $2');

  return result;
}

  private toSansSerifBold(text: string): string {
    const boldMap: { [key: string]: string } = {
      a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶',
      j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿',
      s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
      A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜',
      J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥',
      S: '𝗦', T: '𝗧', U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭'
    };
    return text.split('').map(char => boldMap[char] ?? char).join('');
  }

  private toSansSerifItalic(text: string): string {
    const italicMap: { [key: string]: string } = {
      a: '𝘢', b: '𝘣', c: '𝘤', d: '𝘥', e: '𝘦', f: '𝘧', g: '𝘨', h: '𝘩', i: '𝘪',
      j: '𝘫', k: '𝘬', l: '𝘭', m: '𝘮', n: '𝘯', o: '𝘰', p: '𝘱', q: '𝘲', r: '𝘳',
      s: '𝘴', t: '𝘵', u: '𝘶', v: '𝘷', w: '𝘸', x: '𝘹', y: '𝘺', z: '𝘻',
      A: '𝘈', B: '𝘉', C: '𝘊', D: '𝘋', E: '𝘌', F: '𝘍', G: '𝘎', H: '𝘐', I: '𝘐',
      J: '𝘑', K: '𝘒', L: '𝘓', M: '𝘔', N: '𝘕', O: '𝘖', P: '𝘗', Q: '𝘘', R: '𝘙',
      S: '𝘚', T: '𝘛', U: '𝘜', V: '𝘝', W: '𝘞', X: '𝘟', Y: '𝘠', Z: '𝘡'
    };
    return text.split('').map(char => italicMap[char] ?? char).join('');
  }
}
