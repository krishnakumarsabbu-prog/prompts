import pandas as pd
import json
from pathlib import Path


def generate_ibm_mq_graph(csv_path, output_json="mq_react_flow_data.json"):
    df = pd.read_csv(csv_path)

    nodes = {}
    edges = []

    X_GAP = 260
    Y_GAP = 180
    START_X = 100
    START_Y = 100

    def add_node(node_id, label, node_type, x, y, animation_order, extra=None):
        if node_id not in nodes:
            nodes[node_id] = {
                "id": node_id,
                "type": node_type,
                "position": {"x": x, "y": y},
                "data": {
                    "label": str(label),
                    "animationOrder": animation_order,
                    "fadeIn": True,
                    "pulse": True,
                    **(extra or {})
                },
                "style": {
                    "opacity": 0,
                    "transition": "all 0.8s ease"
                }
            }

    def add_edge(source, target, animation_order, label=None):
        edge_id = f"e_{source}_{target}"
        if edge_id not in [e["id"] for e in edges]:
            edges.append({
                "id": edge_id,
                "source": source,
                "target": target,
                "label": label or "",
                "animated": True,
                "type": "smoothstep",
                "data": {
                    "animationOrder": animation_order
                },
                "style": {
                    "strokeWidth": 2,
                    "strokeDasharray": "8 4"
                }
            })

    for idx, row in df.iterrows():
        y = START_Y + (idx * Y_GAP)
        step = 1

        flow_type = str(row.get("flow_type", "")).strip().lower()

        # Node IDs
        p_app = f"app_prod_{row['producer_app_id']}_{idx}"
        p_qmgr = f"qmgr_src_{row['producer_queue_manager']}_{idx}"
        p_queue = f"queue_src_{row['producer_queue_name']}_{idx}"

        c_qmgr = f"qmgr_tgt_{row['consumer_queue_manager']}_{idx}"
        c_queue = f"queue_tgt_{row['consumer_queue_name']}_{idx}"
        c_app = f"app_cons_{row['consumer_app_id']}_{idx}"

        # Column positions
        x_positions = {
            "p_app": START_X,
            "p_qmgr": START_X + X_GAP,
            "p_queue": START_X + (2 * X_GAP),
            "xmit": START_X + (3 * X_GAP),
            "channel": START_X + (4 * X_GAP),
            "c_qmgr": START_X + (5 * X_GAP),
            "c_queue": START_X + (6 * X_GAP),
            "c_app": START_X + (7 * X_GAP),
        }

        # Producer App
        add_node(
            p_app,
            row["producer_app_name"],
            "producerApp",
            x_positions["p_app"],
            y,
            step
        )
        step += 1

        # Source Queue Manager
        add_node(
            p_qmgr,
            row["producer_queue_manager"],
            "queueManager",
            x_positions["p_qmgr"],
            y,
            step
        )
        step += 1

        # Source Queue
        add_node(
            p_queue,
            row["producer_queue_name"],
            "queue",
            x_positions["p_queue"],
            y,
            step
        )
        step += 1

        # Base edges
        add_edge(p_app, p_qmgr, 1)
        add_edge(p_qmgr, p_queue, 2)

        if flow_type == "remote":
            xmit = f"xmit_{row['transmit_queue_name']}_{idx}"
            channel = f"chan_{row['channel_name']}_{idx}"

            add_node(
                xmit,
                row["transmit_queue_name"],
                "xmitQueue",
                x_positions["xmit"],
                y,
                step
            )
            step += 1

            add_node(
                channel,
                row["channel_name"],
                "channel",
                x_positions["channel"],
                y,
                step
            )
            step += 1

            add_node(
                c_qmgr,
                row["consumer_queue_manager"],
                "queueManager",
                x_positions["c_qmgr"],
                y,
                step
            )
            step += 1

            add_node(
                c_queue,
                row["consumer_queue_name"],
                "queue",
                x_positions["c_queue"],
                y,
                step
            )
            step += 1

            add_node(
                c_app,
                row["consumer_app_name"],
                "consumerApp",
                x_positions["c_app"],
                y,
                step
            )

            add_edge(p_queue, xmit, 3)
            add_edge(xmit, channel, 4, "XMIT")
            add_edge(channel, c_qmgr, 5, "CHANNEL")
            add_edge(c_qmgr, c_queue, 6)
            add_edge(c_queue, c_app, 7)

        else:
            # Local flow
            add_node(
                c_qmgr,
                row["consumer_queue_manager"],
                "queueManager",
                x_positions["c_qmgr"],
                y,
                step
            )
            step += 1

            add_node(
                c_queue,
                row["consumer_queue_name"],
                "queue",
                x_positions["c_queue"],
                y,
                step
            )
            step += 1

            add_node(
                c_app,
                row["consumer_app_name"],
                "consumerApp",
                x_positions["c_app"],
                y,
                step
            )

            add_edge(p_queue, c_qmgr, 3)
            add_edge(c_qmgr, c_queue, 4)
            add_edge(c_queue, c_app, 5)

    graph = {
        "nodes": list(nodes.values()),
        "edges": edges,
        "meta": {
            "layout": "horizontal",
            "animation": {
                "enabled": True,
                "type": "sequential",
                "durationMs": 1000
            }
        }
    }

    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(graph, f, indent=2)

    print(f"Generated graph JSON: {output_json}")
    return graph


# Usage
if __name__ == "__main__":
    csv_file = "mq_topology_data.csv"   # update path
    generate_ibm_mq_graph(csv_file)
