import Eval from '../object/Eval';
import PostMessage from '../object/PostMessage';

export default function Imports(node: any, parent: any = {}, ctx: any = {}, dynamic: any = {}) {
    if (node.type=='Literal'&&(parent.type=='ImportDeclaration'||parent.type=='ExportNamedDeclaration'||parent.type=='ExportAllDeclaration')) {
        var og = node.value + '';
        node.value = ctx.url.encode(node.value, dynamic.meta);
        node.raw = node.raw.replace(og, node.value);
        node.__dynamic = true;
    }

    if (node.type=='ImportExpression') {
        node.source = {type: 'CallExpression', callee: {type: 'Identifier', name: '__dynamic$import'}, arguments: [node.source, {type: 'Literal', __dynamic: true, value: ctx.meta.href}]};
        node.__dynamic = true;
    }
}