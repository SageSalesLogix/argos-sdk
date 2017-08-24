//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     ANTLR Version: 4.7
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

// Generated from L20nLexer.g4 by ANTLR 4.7

// Unreachable code detected
#pragma warning disable 0162
// The variable '...' is assigned but its value is never used
#pragma warning disable 0219
// Missing XML comment for publicly visible type or member '...'
#pragma warning disable 1591
// Ambiguous reference in cref attribute
#pragma warning disable 419

using System;
using System.IO;
using System.Text;
using Antlr4.Runtime;
using Antlr4.Runtime.Atn;
using Antlr4.Runtime.Misc;
using DFA = Antlr4.Runtime.Dfa.DFA;

[System.CodeDom.Compiler.GeneratedCode("ANTLR", "4.7")]
[System.CLSCompliant(false)]
public partial class L20nLexer : Lexer {
	protected static DFA[] decisionToDFA;
	protected static PredictionContextCache sharedContextCache = new PredictionContextCache();
	public const int
		Comment=1, Open=2, Ws=3, Identifier=4, Colon=5, MultiString=6, String=7, 
		Space=8, Close=9;
	public const int
		Inside=1;
	public static string[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static string[] modeNames = {
		"DEFAULT_MODE", "Inside"
	};

	public static readonly string[] ruleNames = {
		"Comment", "Open", "Ws", "Identifier", "Colon", "MultiString", "String", 
		"Space", "Close"
	};


	public L20nLexer(ICharStream input)
	: this(input, Console.Out, Console.Error) { }

	public L20nLexer(ICharStream input, TextWriter output, TextWriter errorOutput)
	: base(input, output, errorOutput)
	{
		Interpreter = new LexerATNSimulator(this, _ATN, decisionToDFA, sharedContextCache);
	}

	private static readonly string[] _LiteralNames = {
		null, null, "'<'", null, null, "':'", null, null, null, "'>'"
	};
	private static readonly string[] _SymbolicNames = {
		null, "Comment", "Open", "Ws", "Identifier", "Colon", "MultiString", "String", 
		"Space", "Close"
	};
	public static readonly IVocabulary DefaultVocabulary = new Vocabulary(_LiteralNames, _SymbolicNames);

	[NotNull]
	public override IVocabulary Vocabulary
	{
		get
		{
			return DefaultVocabulary;
		}
	}

	public override string GrammarFileName { get { return "L20nLexer.g4"; } }

	public override string[] RuleNames { get { return ruleNames; } }

	public override string[] ChannelNames { get { return channelNames; } }

	public override string[] ModeNames { get { return modeNames; } }

	public override string SerializedAtn { get { return new string(_serializedATN); } }

	static L20nLexer() {
		decisionToDFA = new DFA[_ATN.NumberOfDecisions];
		for (int i = 0; i < _ATN.NumberOfDecisions; i++) {
			decisionToDFA[i] = new DFA(_ATN.GetDecisionState(i), i);
		}
	}
	private static char[] _serializedATN = {
		'\x3', '\x608B', '\xA72A', '\x8133', '\xB9ED', '\x417C', '\x3BE7', '\x7786', 
		'\x5964', '\x2', '\v', 'U', '\b', '\x1', '\b', '\x1', '\x4', '\x2', '\t', 
		'\x2', '\x4', '\x3', '\t', '\x3', '\x4', '\x4', '\t', '\x4', '\x4', '\x5', 
		'\t', '\x5', '\x4', '\x6', '\t', '\x6', '\x4', '\a', '\t', '\a', '\x4', 
		'\b', '\t', '\b', '\x4', '\t', '\t', '\t', '\x4', '\n', '\t', '\n', '\x3', 
		'\x2', '\x3', '\x2', '\x3', '\x2', '\x3', '\x2', '\a', '\x2', '\x1B', 
		'\n', '\x2', '\f', '\x2', '\xE', '\x2', '\x1E', '\v', '\x2', '\x3', '\x2', 
		'\x3', '\x2', '\x3', '\x2', '\x3', '\x3', '\x3', '\x3', '\x3', '\x3', 
		'\x3', '\x3', '\x3', '\x4', '\x3', '\x4', '\x3', '\x4', '\x3', '\x4', 
		'\x3', '\x5', '\x6', '\x5', ',', '\n', '\x5', '\r', '\x5', '\xE', '\x5', 
		'-', '\x3', '\x6', '\x3', '\x6', '\x3', '\a', '\x3', '\a', '\x3', '\a', 
		'\x3', '\a', '\x3', '\a', '\a', '\a', '\x37', '\n', '\a', '\f', '\a', 
		'\xE', '\a', ':', '\v', '\a', '\x3', '\a', '\x3', '\a', '\x3', '\a', '\x3', 
		'\a', '\x3', '\b', '\x3', '\b', '\x3', '\b', '\x3', '\b', '\a', '\b', 
		'\x44', '\n', '\b', '\f', '\b', '\xE', '\b', 'G', '\v', '\b', '\x3', '\b', 
		'\x3', '\b', '\x3', '\t', '\x6', '\t', 'L', '\n', '\t', '\r', '\t', '\xE', 
		'\t', 'M', '\x3', '\t', '\x3', '\t', '\x3', '\n', '\x3', '\n', '\x3', 
		'\n', '\x3', '\n', '\x4', '\x1C', '\x38', '\x2', '\v', '\x4', '\x3', '\x6', 
		'\x4', '\b', '\x5', '\n', '\x6', '\f', '\a', '\xE', '\b', '\x10', '\t', 
		'\x12', '\n', '\x14', '\v', '\x4', '\x2', '\x3', '\x6', '\x4', '\x2', 
		'\v', '\f', '\xF', '\xF', '\x5', '\x2', '\x32', ';', '\x43', '\\', '\x63', 
		'|', '\x3', '\x2', '$', '$', '\x5', '\x2', '\v', '\f', '\xF', '\xF', '\"', 
		'\"', '\x2', 'Y', '\x2', '\x4', '\x3', '\x2', '\x2', '\x2', '\x2', '\x6', 
		'\x3', '\x2', '\x2', '\x2', '\x2', '\b', '\x3', '\x2', '\x2', '\x2', '\x3', 
		'\n', '\x3', '\x2', '\x2', '\x2', '\x3', '\f', '\x3', '\x2', '\x2', '\x2', 
		'\x3', '\xE', '\x3', '\x2', '\x2', '\x2', '\x3', '\x10', '\x3', '\x2', 
		'\x2', '\x2', '\x3', '\x12', '\x3', '\x2', '\x2', '\x2', '\x3', '\x14', 
		'\x3', '\x2', '\x2', '\x2', '\x4', '\x16', '\x3', '\x2', '\x2', '\x2', 
		'\x6', '\"', '\x3', '\x2', '\x2', '\x2', '\b', '&', '\x3', '\x2', '\x2', 
		'\x2', '\n', '+', '\x3', '\x2', '\x2', '\x2', '\f', '/', '\x3', '\x2', 
		'\x2', '\x2', '\xE', '\x31', '\x3', '\x2', '\x2', '\x2', '\x10', '?', 
		'\x3', '\x2', '\x2', '\x2', '\x12', 'K', '\x3', '\x2', '\x2', '\x2', '\x14', 
		'Q', '\x3', '\x2', '\x2', '\x2', '\x16', '\x17', '\a', '\x31', '\x2', 
		'\x2', '\x17', '\x18', '\a', ',', '\x2', '\x2', '\x18', '\x1C', '\x3', 
		'\x2', '\x2', '\x2', '\x19', '\x1B', '\v', '\x2', '\x2', '\x2', '\x1A', 
		'\x19', '\x3', '\x2', '\x2', '\x2', '\x1B', '\x1E', '\x3', '\x2', '\x2', 
		'\x2', '\x1C', '\x1D', '\x3', '\x2', '\x2', '\x2', '\x1C', '\x1A', '\x3', 
		'\x2', '\x2', '\x2', '\x1D', '\x1F', '\x3', '\x2', '\x2', '\x2', '\x1E', 
		'\x1C', '\x3', '\x2', '\x2', '\x2', '\x1F', ' ', '\a', ',', '\x2', '\x2', 
		' ', '!', '\a', '\x31', '\x2', '\x2', '!', '\x5', '\x3', '\x2', '\x2', 
		'\x2', '\"', '#', '\a', '>', '\x2', '\x2', '#', '$', '\x3', '\x2', '\x2', 
		'\x2', '$', '%', '\b', '\x3', '\x2', '\x2', '%', '\a', '\x3', '\x2', '\x2', 
		'\x2', '&', '\'', '\t', '\x2', '\x2', '\x2', '\'', '(', '\x3', '\x2', 
		'\x2', '\x2', '(', ')', '\b', '\x4', '\x3', '\x2', ')', '\t', '\x3', '\x2', 
		'\x2', '\x2', '*', ',', '\t', '\x3', '\x2', '\x2', '+', '*', '\x3', '\x2', 
		'\x2', '\x2', ',', '-', '\x3', '\x2', '\x2', '\x2', '-', '+', '\x3', '\x2', 
		'\x2', '\x2', '-', '.', '\x3', '\x2', '\x2', '\x2', '.', '\v', '\x3', 
		'\x2', '\x2', '\x2', '/', '\x30', '\a', '<', '\x2', '\x2', '\x30', '\r', 
		'\x3', '\x2', '\x2', '\x2', '\x31', '\x32', '\a', '$', '\x2', '\x2', '\x32', 
		'\x33', '\a', '$', '\x2', '\x2', '\x33', '\x34', '\a', '$', '\x2', '\x2', 
		'\x34', '\x38', '\x3', '\x2', '\x2', '\x2', '\x35', '\x37', '\v', '\x2', 
		'\x2', '\x2', '\x36', '\x35', '\x3', '\x2', '\x2', '\x2', '\x37', ':', 
		'\x3', '\x2', '\x2', '\x2', '\x38', '\x39', '\x3', '\x2', '\x2', '\x2', 
		'\x38', '\x36', '\x3', '\x2', '\x2', '\x2', '\x39', ';', '\x3', '\x2', 
		'\x2', '\x2', ':', '\x38', '\x3', '\x2', '\x2', '\x2', ';', '<', '\a', 
		'$', '\x2', '\x2', '<', '=', '\a', '$', '\x2', '\x2', '=', '>', '\a', 
		'$', '\x2', '\x2', '>', '\xF', '\x3', '\x2', '\x2', '\x2', '?', '\x45', 
		'\a', '$', '\x2', '\x2', '@', '\x41', '\a', '^', '\x2', '\x2', '\x41', 
		'\x44', '\a', '$', '\x2', '\x2', '\x42', '\x44', '\n', '\x4', '\x2', '\x2', 
		'\x43', '@', '\x3', '\x2', '\x2', '\x2', '\x43', '\x42', '\x3', '\x2', 
		'\x2', '\x2', '\x44', 'G', '\x3', '\x2', '\x2', '\x2', '\x45', '\x43', 
		'\x3', '\x2', '\x2', '\x2', '\x45', '\x46', '\x3', '\x2', '\x2', '\x2', 
		'\x46', 'H', '\x3', '\x2', '\x2', '\x2', 'G', '\x45', '\x3', '\x2', '\x2', 
		'\x2', 'H', 'I', '\a', '$', '\x2', '\x2', 'I', '\x11', '\x3', '\x2', '\x2', 
		'\x2', 'J', 'L', '\t', '\x5', '\x2', '\x2', 'K', 'J', '\x3', '\x2', '\x2', 
		'\x2', 'L', 'M', '\x3', '\x2', '\x2', '\x2', 'M', 'K', '\x3', '\x2', '\x2', 
		'\x2', 'M', 'N', '\x3', '\x2', '\x2', '\x2', 'N', 'O', '\x3', '\x2', '\x2', 
		'\x2', 'O', 'P', '\b', '\t', '\x3', '\x2', 'P', '\x13', '\x3', '\x2', 
		'\x2', '\x2', 'Q', 'R', '\a', '@', '\x2', '\x2', 'R', 'S', '\x3', '\x2', 
		'\x2', '\x2', 'S', 'T', '\b', '\n', '\x4', '\x2', 'T', '\x15', '\x3', 
		'\x2', '\x2', '\x2', '\n', '\x2', '\x3', '\x1C', '-', '\x38', '\x43', 
		'\x45', 'M', '\x5', '\a', '\x3', '\x2', '\b', '\x2', '\x2', '\x6', '\x2', 
		'\x2',
	};

	public static readonly ATN _ATN =
		new ATNDeserializer().Deserialize(_serializedATN);


}
