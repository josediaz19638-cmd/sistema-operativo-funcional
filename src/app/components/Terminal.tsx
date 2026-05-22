import { useState, useRef, useEffect } from 'react';

export function Terminal() {
  const [history, setHistory] = useState<string[]>([
    'Windows Terminal [Version 1.0.0]',
    '(c) OS Simulator. All rights reserved.',
    ''
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('C:\\Users\\User');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const newHistory = [...history, `${currentPath}> ${trimmedCmd}`];

    if (!trimmedCmd) {
      setHistory([...newHistory, '']);
      return;
    }

    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        newHistory.push(
          'Available commands:',
          '  help     - Show this help message',
          '  clear    - Clear the terminal',
          '  echo     - Print text to terminal',
          '  date     - Show current date and time',
          '  time     - Show current time',
          '  ver      - Show OS version',
          '  dir      - List directory contents',
          '  cd       - Change directory',
          '  cls      - Clear screen',
          '  color    - Change terminal color',
          '  calc     - Simple calculator (usage: calc 5 + 3)',
          ''
        );
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        return;

      case 'echo':
        newHistory.push(args.join(' '), '');
        break;

      case 'date':
        newHistory.push(new Date().toLocaleDateString(), '');
        break;

      case 'time':
        newHistory.push(new Date().toLocaleTimeString(), '');
        break;

      case 'ver':
        newHistory.push('OS Simulator Version 1.0.0', '');
        break;

      case 'dir':
        newHistory.push(
          'Directory of ' + currentPath,
          '',
          '05/20/2026  10:30 AM    <DIR>          .',
          '05/20/2026  10:30 AM    <DIR>          ..',
          '05/15/2026  02:15 PM    <DIR>          Documents',
          '05/18/2026  11:45 AM    <DIR>          Downloads',
          '05/10/2026  09:20 AM    <DIR>          Pictures',
          '05/12/2026  03:30 PM         1,245     file.txt',
          '05/19/2026  04:50 PM        15,680     document.pdf',
          '               2 File(s)         16,925 bytes',
          '               5 Dir(s)  256,000,000,000 bytes free',
          ''
        );
        break;

      case 'cd':
        if (args.length === 0) {
          newHistory.push(currentPath, '');
        } else {
          const newPath = args[0];
          if (newPath === '..') {
            const parts = currentPath.split('\\');
            parts.pop();
            setCurrentPath(parts.join('\\') || 'C:\\');
          } else {
            setCurrentPath(`${currentPath}\\${newPath}`);
          }
          newHistory.push('');
        }
        break;

      case 'calc':
        if (args.length === 3) {
          const a = parseFloat(args[0]);
          const op = args[1];
          const b = parseFloat(args[2]);
          let result = 0;

          switch (op) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case '*': result = a * b; break;
            case '/': result = b !== 0 ? a / b : NaN; break;
            default: newHistory.push('Invalid operator. Use +, -, *, /', ''); break;
          }

          if (!isNaN(result)) {
            newHistory.push(`Result: ${result}`, '');
          }
        } else {
          newHistory.push('Usage: calc <number> <operator> <number>', 'Example: calc 5 + 3', '');
        }
        break;

      default:
        newHistory.push(`'${command}' is not recognized as an internal or external command.`, 'Type "help" for available commands.', '');
    }

    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  return (
    <div className="h-full bg-black text-green-400 font-mono text-sm p-4 overflow-hidden flex flex-col">
      <div ref={terminalRef} className="flex-1 overflow-y-auto mb-2">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all">
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-green-400">{currentPath}&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  );
}
