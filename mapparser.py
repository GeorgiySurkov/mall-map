import xml.etree.ElementTree as ET
import json
from svg.path import parse_path


def complex_to_tuple(number: complex) -> tuple:
    return (int(number.real), int(number.imag))


def tuple_to_complex(number: tuple) -> complex:
    return complex(number[0], number[1])


def node_with_coords_exists(coords: complex, graph: list):
    for i, node in enumerate(graph):
        if node['coords'] == complex_to_tuple(coords):
            return i
    return False


def create_node(coords: complex, graph: list, name=None) -> int:
    graph.append({
        'neighbors': {},
        'coords': complex_to_tuple(coords),
        'name': name
    })
    return len(graph) - 1


def node_is_shop(coords: complex, shops: dict):
    for shop in shops['shops']:
        if complex_to_tuple(coords) == tuple(shop['coords']):
            return shop
    return False


ET.register_namespace('', 'http://www.w3.org/2000/svg')
tree = ET.parse('map.svg')
svg = tree.getroot()
connections = 0
graph = []
shops_node_indexes = {}
with open('shops.json') as f:
    shops = json.load(f)
    for shop in shops['shops']:
        # shop['coords'] = complex_to_tuple(tuple_to_complex(shop['coords']) + 0.5+1.5j) 
        pass

for connection_id, connection in enumerate(filter(lambda el: 'stroke' in el.attrib and el.attrib['stroke'] == '#D00000', svg)):
    path = parse_path(connection.attrib['d'])
    print(path)
    start_node_exists = node_with_coords_exists(path[1].start, graph)
    end_node_exists = node_with_coords_exists(path[1].end, graph)
    if start_node_exists is not False and end_node_exists is not False:
        start_node_i = start_node_exists
        end_node_i = end_node_exists
        graph[start_node_i]['neighbors'][end_node_i] = connection_id
        graph[end_node_i]['neighbors'][start_node_i] = connection_id
    elif start_node_exists is not False:
        start_node_i = start_node_exists
        shop = node_is_shop(path[1].end, shops)
        if shop is not False:
            end_node_i = create_node(path[1].end, graph, shop['name'])
            shops_node_indexes[shop['name']] = end_node_i
        else:
            end_node_i = create_node(path[1].end, graph)
        graph[start_node_i]['neighbors'][end_node_i] = connection_id
        graph[end_node_i]['neighbors'][start_node_i] = connection_id
    elif end_node_exists is not False:
        end_node_i = end_node_exists
        shop = node_is_shop(path[1].start, shops)
        if shop is not False:
            start_node_i = create_node(path[1].start, graph, shop['name'])
            shops_node_indexes[shop['name']] = start_node_i
        else:
            start_node_i = create_node(path[1].start, graph)
        graph[start_node_i]['neighbors'][end_node_i] = connection_id
        graph[end_node_i]['neighbors'][start_node_i] = connection_id
    else:
        start_node_i = create_node(path[1].start, graph)
        end_node_i = create_node(path[1].end, graph)
        graph[start_node_i]['neighbors'][end_node_i] = connection_id
        graph[end_node_i]['neighbors'][start_node_i] = connection_id
    connection.set('id', str(connection_id))
    connections += 1
print(connections)
tree.write('id_map.svg')

with open('graph.json', 'w') as f:
    json.dump({'nodes': graph}, f, ensure_ascii=False)

with open('shops_nodes_indexes.json', 'w') as f:
    json.dump(shops_node_indexes, f, ensure_ascii=False)
